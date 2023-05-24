const Joi = require("joi");

class TaskValidator {
    public static validateTaskCreate(taskData: any): any {
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            startDate: Joi.date().iso().required(),
            deadline: Joi.date().iso().required(),
        });

        return schema.validate(taskData);
    }

    public static validateTaskEdit(taskData: any): any {
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            startDate: Joi.date().iso(),
            deadline: Joi.date().iso(),
        });

        return schema.validate(taskData);
    }
}

export default TaskValidator;
