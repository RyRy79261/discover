/**
 *
 * DappFeature
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';
import { Dapp } from 'domain/Dapps/types';
import classNames from 'classnames';
import { appColors } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      padding: 10,
      "& img":{
        maxWidth: "100%"
      }
    },
    banner:{
      borderRadius: 20,
      overflow: "hidden"
    },
    meta:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      marginTop: 16
    },
    icon:{
      maxWidth: 40,
      maxHeight: 40,
      margin: "0 16px"
    },
    description: {
      "& h4":{
        fontSize: 15
      },
      "& p": {
        fontSize: 13,
        marginTop: 5,
        color: appColors.general.gray.base
      }
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  dapp: Dapp,
  className?: String
}

const DappFeature: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, className, dapp } = props;
  return <article className={classNames(classes.root, className)}>
    <section className={classes.banner}>
      <img src={dapp.banner} alt={`${dapp.name}-banner`}/>
    </section>
    <section className={classes.meta}>
      <div className={classes.icon}>
        <img src={dapp.icon} alt={`${dapp.name}-icon`}/>
      </div>
      <div className={classes.description}>
        <Typography variant="h4" component="h4">
          {dapp.name}
        </Typography>
        <Typography variant="body1" component="p">
          {dapp.description}
        </Typography>
      </div>
    </section>
  </article>;
};

export default withStyles(styles, { withTheme: true })(DappFeature);
