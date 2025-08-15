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

    async sendPayment(paymentData) {
        try {
            const res = await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwritePaymentsCollectionId,
                ID.unique(),
                paymentData
            );
            console.log("Payment sent:", res);
            return res;
        } catch (err) {
            console.error("Error sending payment:", err);
            throw err;
        }
    }

}

const menuService = new MenuService();
export default menuService;
