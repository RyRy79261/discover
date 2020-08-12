/**
 *
 * StakeAndPublishView
 *
 */

import React from 'react'
import { Theme, createStyles, withStyles, WithStyles, Typography, Button } from '@material-ui/core'
import { IDapp } from 'domain/Dapps/types'
import DappInfoHeader from 'components/theme/elements/DappInfoHeader'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup';
import { TOKENS } from 'utils/constants'
import { appColors } from 'theme'
import { TextField } from 'formik-material-ui'

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {
      padding: `15px 0px 10px`,
    },
    header: {
      padding: `0 15px`,
    },
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
      padding: `20px 15px`,
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
  })

interface OwnProps extends WithStyles<typeof styles> {
  dapp: Partial<IDapp>
  submit: (stake: number) => void
}

const StakeAndPublishView: React.SFC<OwnProps> = ({ classes, dapp, submit }: OwnProps) => {
  const CreateSchema = Yup.object().shape({
    stake: Yup.number()
      .min(0, 'Please supply a positive value')
      // TODO Validate against balance
      .required('Please input a value'),
  });
  // const [token, setToken] = useState<TOKENS>(TOKENS.SNT);
  const token = TOKENS.SNT;
  return (<Formik
      initialValues={{
        stake: 0,
      }}
      validationSchema={CreateSchema}
      onSubmit={(values, actions) => {
        submit(values.stake)
      }}
      render={({ submitForm, values, setValues }) => {
        if (values.stake < 0) {
          setValues({
            stake: 0
          })
        }
        return (
          <Form className={classes.root}>
            <DappInfoHeader className={classes.header} changeIndicator={values.stake} dapp={{
              ...dapp,
              sntValue: values.stake
            } as IDapp} />
            <section className={classes.inputSection}>
              <Field
                className={classes.field}
                name="stake"
                type="number"
                step="1"
                min="0"
                component={TextField}
              />
              <span className={classes.tokenLabel}>{token}</span>
            </section>
            <section className={classes.information}>
              <Typography>
                {token} you spend to rank your DApp is locked in the store. You can earn back through votes, or withdraw, the majority of this {token} at any time.
              </Typography>
            </section>
            <section className={classes.ctas}>
              <Button disabled={values.stake < 0} variant="outlined" type="submit">
                {
                  values.stake < 1 ? 'Publish' : 'Stake & Publish'
                }
              </Button>
            </section>
          </Form>
        )
      }}
    />)
}

export default withStyles(styles, { withTheme: true })(StakeAndPublishView)
