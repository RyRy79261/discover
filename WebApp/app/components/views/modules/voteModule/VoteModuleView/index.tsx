/**
 *
 * VoteModuleView
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import DownvoteContainer from 'containers/modules/VoteModule/subContainers/DownvoteContainer';
import UpvoteContainer from 'containers/modules/VoteModule/subContainers/UpvoteContainer';
import classNames from 'classnames';
import { ROUTE_LINKS } from 'routeLinks';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {
  upvote: boolean
}

const VoteModuleView: React.SFC<OwnProps> = ({
  classes,
  upvote
}: OwnProps) => {
  return <article className={classes.root}>
    <header>
      <Link to={ROUTE_LINKS.UpvoteDApp}>
        Upvote
      </Link>
      <Link to={ROUTE_LINKS.DownvoteDApp}>
        Downvote
      </Link>
    </header>
    <div className={classNames(classes.root, upvote  ? "upvote" : "downvote" )}>
      <UpvoteContainer />
      <DownvoteContainer />
    </div>
  </article>
};

export default withStyles(styles, { withTheme: true })(VoteModuleView);
