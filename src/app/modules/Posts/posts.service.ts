import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { IPost } from './posts.interface';
import { Post } from './posts.model';

const createPost = async (files: any[], user: any, payload: IPost) => {
  const imageUrls: string[] = [];

  if (files && files.length > 0) {
    // Iterate over each image file and upload it to Cloudinary
    for (const file of files) {
      const imageName = `images_${Math.random().toString().split('.')[1]}`;
      const path = file.path;

      // Upload image to Cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      imageUrls.push(secure_url as string);
    }
  }

  // Attach uploaded image URLs to the payload
  payload.imageUrls = imageUrls;
  payload.authorId = user;

  const post = await Post.create(payload);

  return post;
};

export const PostServices = {
  createPost,
};
