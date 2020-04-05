import React from 'react';
import { Redirect, withRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { routes } from '@/router/routes';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Content } = Layout;

// console.log('st')

// class MainContent extends React.Component{

//   render() {
//     return (
//       <TransitionGroup>
//         <CSSTransition classNames='fade' key={location.pathname} timeout={400}>
//           <Content style={{ padding: '4px 15px' }}>
//             <Switch>
//               {routes.map(
//                 ele =>
//                   handleFilter(ele.permission) && (
//                     <Route
//                       render={() => <ele.component />}
//                       key={ele.path}
//                       path={ele.path}
//                     />
//                   )
//               )}
//               <Redirect from='/' exact to='/index' />
//               <Redirect to='/404' />
//             </Switch>
//           </Content>
//         </CSSTransition>
//       </TransitionGroup>
//     );
//   }
// }

const MainContent = ({ location }, props) => {
  console.log('props', props);

  const roleType =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo')).role.type;

  const handleFilter = permission => {
    // 过滤没有权限的页面
    if (!permission || permission === roleType) return true;
    return false;
  };

  return (
    <TransitionGroup>
      <CSSTransition classNames='fade' key={location.pathname} timeout={400}>
        <Content style={{ padding: '4px 15px' }}>
          <Switch>
            {routes.map(
              ele =>
                handleFilter(ele.permission) && (
                  <Route
                    render={() => <ele.component />}
                    key={ele.path}
                    path={ele.path}
                  />
                )
            )}
            <Redirect from='/' exact to='/index' />
            <Redirect to='/404' />
          </Switch>
        </Content>
      </CSSTransition>
    </TransitionGroup>
  );
};

const mapStateToProps = state => ({ userInfo: state.userInfo });
const mapDispatchToProps = dispatch => ({
  setUserInfo: data => {
    console.log('maincontent');

    dispatch(setUserInfo(data));
  }
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainContent)
);
