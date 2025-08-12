import conf from '../conf/conf.js';
import { Client, Databases, ID, Storage } from "appwrite";

class MenuService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }


    async getMenuItems(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getMenuItems :: Error", error);
            return false;
        }
    }


    async getImageView(fileId) {
        return this.storage.getFileView(
            conf.appwriteBucketId,
            fileId,
        );
    }

}

const menuService = new MenuService();
export default menuService;
