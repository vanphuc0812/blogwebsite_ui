export const FILE_STORAGE = 'api/files/';
export const LOGIN = 'auth/login';
export const REGISTER = 'auth/register';
export const FORGOT_PASSWORD = 'auth/forgotPassword';

//Blog
const blog = 'BlogsManagement/';
export const SEARCH_BLOG = blog + 'SearchBlogs';
export const GET_ALL_BLOG = blog + 'GetAllBlogsPageable';
export const GET_BLOGS_BY_USERNAME = blog + 'GetBlogsByUsername';
export const GET_BLOG = blog + 'GetBlogById';
export const SAVE_BLOG = blog + 'SaveBlog';
export const UPDATE_BLOG = blog + 'UpdateBlog';

//User
export const SEARCH_USER = 'UsersManagement/SearchUsers';
export const GET_USER_BY_USERNAME = 'UsersManagement/GetUserByUsername';
export const FOLLOW_USER = 'UsersManagement/FollowUser';
export const UNFOLLOW_USER = 'UsersManagement/UnfollowUser';

//comment
const comment = 'CommentManagement/';
export const GET_NO_PARENT_COMMENTS = comment + 'GetNoParentCommentsByBlogID';
export const GET_CHILDREN_COMMENTS = comment + 'GetChilrenCommentsByParentID';
export const SAVE_COMMENT = comment + 'SaveComment';
export const DELETE_COMMENT = comment + 'DeleteComment';
