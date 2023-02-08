import joi from 'joi';

const createTeamSchema = joi.object({
  name: joi.string().required()
});

export default createTeamSchema;