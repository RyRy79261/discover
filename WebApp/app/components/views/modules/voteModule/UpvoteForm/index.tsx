/**
 *
 * UpvoteForm
 *
 */

import React, { useState } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TOKENS } from 'utils/constants';
import { TextField } from 'formik-material-ui';
import { appColors } from 'theme';
import { Link } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import { IDapp } from 'domain/Dapps/types';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    inputSection: {
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      fontSize: 32,
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        display: 'block',
        bottom: 0,
        left: '50%',
        backgroundColor: appColors.general.gray.background,
        height: 1,
        width: 'calc(100% + 30px)',
        transform: 'translate(-50%, 0)',
      },
    },
    field: {
      width: '50%',
      maxWidth: '50%',
      '& > *': {
        '&:before,&:after': {
          display: 'none',
        },
      },
      '& input': {
        fontSize: 32,
        textAlign: 'right',
      },
    },
    tokenLabel: {
      maxWidth: '50%',
      width: '50%',
      height: 51,
      display: 'flex',
      alignItems: 'center',
      marginLeft: 5,
      color: appColors.general.gray.base,
    },
    information: {
      color: appColors.general.gray.base,
      padding: `20px 0`,
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        display: 'block',
        bottom: 0,
        left: '50%',
        backgroundColor: appColors.general.gray.background,
        height: 1,
        width: 'calc(100% + 30px)',
        transform: 'translate(-50%, 0)',
      },
      '& a': {
        textDecoration: 'none',
        color: appColors.general.blue.base,
      },
    },
    ctas: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  upvote: (dappId: string, amount: number, token: TOKENS) => void
  dapp: IDapp
}

const UpvoteForm: React.SFC<OwnProps> = ({ classes, dapp, upvote }: OwnProps) => {
  const [token, setToken] = useState<TOKENS>(TOKENS.SNT);

  const UpvoteSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1, 'Minimum amount is 1')
      // TODO Validate against balance
      .required('Please input a value'),
  });

  return (
    <Formik
      initialValues={{
        amount: 0,
      }}
      validationSchema={UpvoteSchema}
      onSubmit={(values, actions) => {
        upvote(`${dapp.ipfsHash}`, values.amount, token)
      }}
      render={({ submitForm }) => (
        <Form className={classes.root}>
          <section className={classes.inputSection}>
            <Field
              className={classes.field}
              name="amount"
              type="number"
              step="1"
              component={TextField}
            />
            <span className={classes.tokenLabel}>{token}</span>
          </section>
          <section className={classes.information}>
            <Typography>
              {token} you spend to upvote is locked in the contract and
              contributes directly to {dapp.name}'s ranking.{' '}
              <Link to={ROUTE_LINKS.HowToVote}>Learn more↗</Link>
            </Typography>
          </section>
          <section className={classes.ctas}>
            <Button variant="outlined" type="submit">
              Upvote
            </Button>
          </section>
        </Form>
      )}
    />
  );
};

export default withStyles(styles, { withTheme: true })(UpvoteForm);
