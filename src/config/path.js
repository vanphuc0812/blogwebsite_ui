export const FILE_STORAGE = 'api/files/';
export const LOGIN = 'auth/login';
export const REGISTER = 'auth/register';
export const FORGOT_PASSWORD = 'auth/forgotPassword';

//Blog
export const SEARCH_BLOG = 'BlogsManagement/SearchBlogs';
export const GET_ALL_BLOG = 'BlogsManagement/GetAllBlogsPageable';
export const GET_BLOG = 'BlogsManagement/GetBlogById';
export const SAVE_BLOG = 'BlogsManagement/SaveBlog';

//User
export const SEARCH_USER = 'UsersManagement/SearchUsers';
export const GET_USER_BY_USERNAME = 'UsersManagement/GetUserByUsername';
export const FOLLOW_USER = 'UsersManagement/FollowUser';
export const UNFOLLOW_USER = 'UsersManagement/UnfollowUser';

//comment
const comment = 'CommentManagement/';
export const GET_NO_PARENT_COMMENTS = comment + 'GetNoParentCommentsByBlogID';
export const GET_CHILDREN_COMMENTS = comment + 'GetChilrenCommentsByParentID';
