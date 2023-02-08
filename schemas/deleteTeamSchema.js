import joi from 'joi';

const deleteTeamSchema = joi.object({
  id: joi.number().required()
});

export default deleteTeamSchema;