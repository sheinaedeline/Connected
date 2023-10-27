import { Schema, Model, model, SchemaOptions} from 'mongoose';
import {projectObj} from '@mongodb/schemaObject'
import type {IProject} from '@interfaces/mongoDBInterfaces';

type ProjectModel = Model<IProject>;

const projectSchemaOptions: SchemaOptions<IProject> = {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
};

const projectSchema = new Schema<IProject, ProjectModel>(projectObj,projectSchemaOptions);

const Project = model<IProject>('Project', projectSchema);

export default Project;