function replaceTemplateVariables(template, variables) {
    let updatedTemplate = template;
  
    Object.keys(variables).forEach(key => {
      const placeholder = `{${key}}`;  
      updatedTemplate = updatedTemplate.replace(new RegExp(placeholder, 'g'), variables[key]);
    });
  
    return updatedTemplate;
  }

  export default replaceTemplateVariables