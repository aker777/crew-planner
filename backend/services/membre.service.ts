import {MembreDocument, MembreModel, MembreProps} from "../models";
export class MembreService {
    private static instance?: MembreService;
    public static getInstance(): MembreService {
        if(MembreService.instance === undefined) {
            MembreService.instance = new MembreService();
        }
        return MembreService.instance;
    }
    private constructor() { }

    public async createMembre(props: MembreProps): Promise<MembreDocument> {
        const model = new MembreModel(props);
        const membre = await model.save();
        return membre;
    }

    async getAll(): Promise<MembreDocument[]> {
        return MembreModel.find().exec();
    }

    async getById(membreId: string): Promise<MembreDocument | null> {
        return MembreModel.findById(membreId).exec();
    }

    async deleteById(membreId: string): Promise<boolean> {
        const res = await MembreModel.deleteOne({_id: membreId}).exec();
        return res.deletedCount === 1;
    }

    async updateById(membreId: string, props: MembreProps): Promise<MembreDocument | null> {
        const membre = await this.getById(membreId);
        if(!membre) {
            return null;
        }
        if(props.prenom !== undefined) {
            membre.prenom = props.prenom;
        }
        if(props.qualifications !== undefined) {
            membre.qualifications = props.qualifications;
        }
        const res = await membre.save();
        return res;
    }
}
