import { take, call, put, race } from 'redux-saga/effects';
import {
  updateDappAction,
  setDappsLoadingAction,
  withdrawAction,
  updateDappDataAction,
} from '../actions';
import { IWithdrawRequest } from '../types';
import { toast } from 'react-toastify';
import { awaitTxAction } from 'domain/Wallet/actions';
import { TRANSACTION_STATUS } from 'utils/constants';
import {
  DiscoverWithdraw,
  DiscoverWithdrawMax,
} from '../contracts/Discover.contract';
import { generateUri } from 'api/apiUrlBuilder';

function* withdrawSaga(withdrawRequest: IWithdrawRequest) {
  try {
    yield put(setDappsLoadingAction(true));

    const withdrawTx = yield call(
      async () =>
        await DiscoverWithdraw(
          withdrawRequest.id,
          withdrawRequest.max
            ? await DiscoverWithdrawMax(withdrawRequest.id)
            : withdrawRequest.amount,
        ),
    );
    yield put(
      awaitTxAction.request({
        iconSrc: withdrawRequest.icon.includes('base64')
          ? withdrawRequest.icon
          : generateUri(withdrawRequest.icon),
        hash: withdrawTx,
        state: TRANSACTION_STATUS.PENDING,
        heading: withdrawRequest.name,
        caption: withdrawRequest.desc,
      }),
    );
    const { success, failure } = yield race({
      success: take(awaitTxAction.success),
      failure: take(awaitTxAction.failure),
    });
    if (success) {
      yield put(withdrawAction.success());
      yield put(setDappsLoadingAction(false));
      yield put(updateDappDataAction.request(withdrawRequest.id));
    } else {
      debugger;
      throw failure;
    }
  } catch (error) {
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(setDappsLoadingAction(false));
    yield put(updateDappAction.failure(error));
  }
}

export function* withdrawListener() {
  while (true) {
    const withdrawRequest: IWithdrawRequest = (yield take(
      withdrawAction.request,
    )).payload;
    yield call(withdrawSaga, withdrawRequest);
  }
}
