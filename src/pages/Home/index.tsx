// import { useAppSelector, useAppDispatch } from '@/core/redux/hooks';
// import {
//   postSelector,
//   setPostsError,
//   setPostsLoading,
//   setPostsSuccess,
// } from '@/core/redux/slices/postSlice';
// import { fetchPosts } from '@/core/api/api';

import Tickets from '@/components/Tickets';

function Home() {
  // const dispatch = useAppDispatch();
  // const selectedPosts = useAppSelector(postSelector);
  //
  // const postsLoading = selectedPosts.loading;
  // const postsResult = selectedPosts.result;
  // const postsError = selectedPosts.error;
  //
  // const getPosts = async () => {
  //   dispatch(setPostsLoading(true));
  //
  //   return await fetchPosts()
  //     .then((res) => res.json())
  //     .then((json) => {
  //       dispatch(setPostsLoading(false));
  //       dispatch(setPostsSuccess(json));
  //     })
  //     .catch((e) => {
  //       dispatch(setPostsError(e.message));
  //     });
  // };

  return <Tickets />;
}

export default Home;
