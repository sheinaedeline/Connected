import { Schema, Model, model, SchemaOptions} from 'mongoose';

export interface IProject {
    owner: Schema.Types.ObjectId; // You can use the user's ObjectId here to reference the owner
    project_title: string;
    tags: Array<string>;
    description: string;
    start_date: Date;
    end_date: Date;
    No_professional: string;        //5 means 5 professionals dont forget to convert to int
    expected_working_hours: string; // 3 means 3 hrs dont forget to convert to int
    skills: string;
    experiences: string;
    online_offline: string;        
    price_budget: string;
    req_prof_criteria: string;      //resume or CV or aything
    status: string;
    potential_applicants: Array<Schema.Types.ObjectId>;
    approved_applicants: Array<Schema.Types.ObjectId>;

}

type ProjectModel = Model<IProject>;

const projectSchemaOptions: SchemaOptions<IProject> = {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
};

const projectSchema = new Schema<IProject, ProjectModel>({
    owner: {
        type: Schema.Types.ObjectId,
        // ref: 'User', // Reference to the User model
        // required: true,
    },
    project_title: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    description: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    No_professional: {
        type: String,
        required: true,
    },
    expected_working_hours: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
    },
    experiences: {
        type: String,
    },
    online_offline: {
        type: String,
        required: true,
    },
    price_budget: {
        type: String,
    },
    req_prof_criteria: {
        type: String,
    },
    status: {
        type: String,
    },
    potential_applicants: {
        type: [Schema.Types.ObjectId],
    },
    approved_applicants: {
        type: [Schema.Types.ObjectId],
    },
},projectSchemaOptions);

const Project = model<IProject>('Project', projectSchema);

export default Project;