import prisma from "../DB_config/config.js";

const updateUserPreference = async(req , res , next)=>{
    try {
        const {userId} = req.query;
        const {newPreferences} = req.body;

        const existingPreference = await prisma.userPreference.findMany({
            where:{
                userId
            }
        });

        if (existingPreference.length === 0) {
            if (newPreferences.length > 0) {
                const response = await prisma.$transaction(
                    [...newPreferences.map(channel =>
                        prisma.userPreference.create({
                            data: { userId, channel },
                        })
                    )]
                );
                return res.status(200).json({ message: 'User preferences created successfully', data: response });
            } else {
                return res.status(200).json({ message: 'No preferences provided, nothing to update' });
            }
        }

        const existingChannels = new Set(existingPreference.map(pref => pref.channel));
        const newPreferencesSet = new Set(newPreferences);

        const preferencesToAdd = [...newPreferencesSet].filter(channel => !existingChannels.has(channel));
        const preferencesToRemove = [...existingChannels].filter(channel => !newPreferencesSet.has(channel));

         const response = await prisma.$transaction([
            ...preferencesToAdd.map(channel => prisma.userPreference.create({
                data: { userId, channel },
            })),
            prisma.userPreference.deleteMany({
                where: {
                    userId,
                    channel: { in: preferencesToRemove },
                },
            }),
        ]);

        if (newPreferences.length === 0) {
            await prisma.userPreference.deleteMany({ 
                where: { 
                    userId 
                } 
            });
        }

        return res.status(200).json({ message: 'User preferences updated successfully', data: response });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating user preferences', error });
    }
}

export default updateUserPreference;