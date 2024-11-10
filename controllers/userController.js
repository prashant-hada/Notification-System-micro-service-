import prisma from "../DB_config/config.js";

const updateUserPreference = async(req , res , next)=>{
    try {
        const {userId} = req.query;
        const {newPreferences} = req.body;

        existingPreference = await prisma.userPreference.findMany({
            where:{
                userId
            }
        })

        const existingChannels = new Set(existingPreference.map(pref => pref.channel));
        const newPreferencesSet = new Set(newPreferences);

        const preferencesToAdd = [...newPreferencesSet].filter(channel => !existingChannels.has(channel));
        const preferencesToRemove = [...existingChannels].filter(channel => !newPreferencesSet.has(channel));

        const response = await prisma.$transaction([
            // Add new preferences if any
            ...preferencesToAdd.map(channel => prisma.userPreference.create({
                data: { userId, channel },
            })),
            // Remove preferences if any
            prisma.userPreference.deleteMany({
                where: {
                    userId,
                    channel: { in: preferencesToRemove },
                },
            }),
        ]);

        // Step 4: Handle the case when an empty array removes all user preferences
        if (newPreferences.length === 0) {
            await prisma.userPreference.deleteMany({ 
                where: { 
                    userId 
                } 
            });
        }

        res.status(200).json({ message: 'User preferences updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating user preferences' });
    }
}

export default updateUserPreference;