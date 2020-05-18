/**
 *
 * VoteModule
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import VoteModuleView from 'components/views/modules/voteModule/VoteModuleView';
import { ApplicationRootState } from 'types';
import { RootState } from 'domain/App/types';
import { useRouteMatch, match  } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
// import { ROUTE_LINKS } from 'routeLinks';

interface OwnProps {

}

interface DispatchProps {
}

interface StateProps {
}

interface RouteParams {
  dappID: string;
  voteType: string
}

type Props = StateProps & DispatchProps & OwnProps;

const VoteModule: React.SFC<Props> = ({

}: Props) => {
  const match:  match<RouteParams> | null = useRouteMatch({
    path: ROUTE_LINKS.Vote(":dappID", ":voteType"),
    strict: true,
    sensitive: true
  });

  return match?.params.dappID && match.params.voteType ? <VoteModuleView
    upvote={match?.params.voteType == "upvote" ? true : false}
    dappID={match?.params.dappID}
  /> : <Fragment />
};

const mapStateToProps = (state: ApplicationRootState, props: OwnProps) => createStructuredSelector<RootState, StateProps>({
  // dapp: makeSelectDapp("")
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VoteModule);
