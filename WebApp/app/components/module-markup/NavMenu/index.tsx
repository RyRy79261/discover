/**
 *
 * NavMenu
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { AppRoute } from 'routes';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
  });

interface OwnProps extends WithStyles<typeof styles> {
  navLinks: AppRoute[]
}

const NavMenu: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes } = props;
  return <Fragment>
    <span className={classes.root}>

    </span>
  </Fragment>;
};

export default withStyles(styles, { withTheme: true })(NavMenu);