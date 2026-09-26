import { Client, ID, Query, Storage, TablesDB } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appWriteProjectId);

    this.databases = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create a post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createRow({
        databaseId: conf.appWriteDatabaseId,
        tableId: conf.appWriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      return false;
    }
  }

  // Update a post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateRow({
        databaseId: conf.appWriteDatabaseId,
        tableId: conf.appWriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }

  // Delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteRow({
        databaseId: conf.appWriteDatabaseId,
        tableId: conf.appWriteTableId,
        rowId: slug,
      });

      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // Get a single post
  async getPost(slug) {
    try {
      return await this.databases.getRow({
        databaseId: conf.appWriteDatabaseId,
        tableId: conf.appWriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  // Get posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listRows({
        databaseId: conf.appWriteDatabaseId,
        tableId: conf.appWriteTableId,
        queries,
      });
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // Upload a file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appWriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  // Delete a file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appWriteBucketId,
        fileId,
      });

      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  // Get file preview
  getFilePreview(fileId) {
    return this.bucket.getFileView({
      bucketId: conf.appWriteBucketId,
      fileId,
    });
  }
}

const service = new Service();

export default service;
