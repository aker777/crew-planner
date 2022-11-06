import express, {Router, Request, Response} from "express";
import {MembreService} from "../services";

export class MembreController {

    async createMembre(req: Request, res: Response) {
        const membreBody = req.body;
        if(!membreBody.prenom) {
            res.status(500).end(); // 400 -> bad request
            return;
        }
        try {
            const membre = await MembreService.getInstance().createMembre({
                prenom: membreBody.prenom,
                qualifications: membreBody.qualifications,
            });
            res.json(membre);
        } catch(err) {
            res.status(400).end('error:'+err); // erreur des données utilisateurs
            return;
        }
    }

    async getAllMembres(req: Request, res: Response) {
        const membres = await MembreService.getInstance().getAll();
        res.json(membres);
    }

    async getMembre(req: Request, res: Response) {
        try {
            const membre = await MembreService.getInstance().getById(req.params.membre_id);
            if(membre === null) {
                res.status(404).end();
                return;
            }
            res.json(membre);
        } catch(err) {
            res.status(400).end();
            return;
        }
    }

    async deleteMembre(req: Request, res: Response) {
        try {
            const success = await MembreService.getInstance().deleteById(req.params.membre_id);
            if(success) {
                res.status(204).end();
            } else {
                res.status(404).end();
            }
        } catch(err) {
            res.status(400).end();
        }
    }

    async updateMembre(req: Request, res: Response) {
        try {
            const membre = await MembreService.getInstance()
                .updateById(req.params.membre_id, req.body);
            if(!membre) {
                res.status(404).end();
                return;
            }
            res.json(membre);
        } catch (err) {
            res.status(400).end();
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        //router.use();
        router.post('/', express.json(), this.createMembre.bind(this)); // permet de forcer le this lors de l'appel de la fonction sayHello
        router.get('/', this.getAllMembres.bind(this));
        router.get('/:membre_id', this.getMembre.bind(this));
        router.delete('/:membre_id', this.deleteMembre.bind(this));
        router.put('/:membre_id', express.json(), this.updateMembre.bind(this));
        return router;
    }
}
