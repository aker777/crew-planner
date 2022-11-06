import mongoose, {Schema, Document, Model} from "mongoose";

const membreSchema = new Schema({
   prenom: {
       type: Schema.Types.String,
       required: true
   },
   qualifications: {
       type: [Schema.Types.String]
   }
}, {
    collection: "membres",
    timestamps: true,
    versionKey: false
});

export interface MembreProps {
    prenom: string;
    qualifications: [number]
}

export type MembreDocument = MembreProps & Document;

export const MembreModel: Model<MembreDocument> = mongoose.model<MembreDocument>("Membre", membreSchema);
