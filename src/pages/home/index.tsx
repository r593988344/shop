import React, { useEffect, useCallback } from 'react';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';

export interface HomeProps {
  dispatch: Dispatch<AnyAction>;
}

const Home: React.FC<HomeProps> = (props) => {
  const { dispatch } = props;

  const fetchData = useCallback(async () => {
    await dispatch({
      type: 'home/getPageList',
      payload: {
        name: 'xxx',
      },
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  return <div>home</div>;
};

export default connect()(Home);
