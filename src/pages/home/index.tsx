import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { TabBar } from 'antd-mobile';

export interface HomeProps {
  dispatch: Dispatch<AnyAction>;
}

const Home: React.ForwardRefRenderFunction<unknown, HomeProps> = (props) => {
  const { dispatch } = props;
  const [selectedTab, setSelectedTab] = useState<string>('blueTab');

  const fetchData = useCallback(async () => {
    await dispatch({
      type: 'home/getPageList',
      payload: {
        name: 'sdsd',
      },
    });
    console.log('sss');
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
      <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
        <TabBar.Item
          title="Life"
          key="Life"
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selected={selectedTab === 'blueTab'}
          badge={1}
          onPress={() => {
            setSelectedTab('blueTab');
          }}
          data-seed="logId"
        >
          {<div>blueTab</div>}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          title="Koubei"
          key="Koubei"
          badge={'new'}
          selected={selectedTab === 'redTab'}
          onPress={() => {
            setSelectedTab('redTab');
          }}
          data-seed="logId1"
        >
          {<div>'Koubei'</div>}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          title="Friend"
          key="Friend"
          dot
          selected={selectedTab === 'greenTab'}
          onPress={() => {
            setSelectedTab('greenTab');
          }}
        >
          {<div>Friend</div>}
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="My"
          key="my"
          selected={selectedTab === 'yellowTab'}
          onPress={() => {
            setSelectedTab('yellowTab');
          }}
        >
          {<div>My</div>}
        </TabBar.Item>
      </TabBar>
    </div>
  );
};

export default connect()(Home);
