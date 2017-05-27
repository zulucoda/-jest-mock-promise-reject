/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2017/05/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
'use strict';
import service from './api-service';
import { onLogging, LoginLoading, LoginError, LoginLoaded } from './login';

describe('Jest Bug with Promise Reject - Unit Test', function () {

  describe('when Promise resolves - mock.calls counts correctly THIS TEST PASSES', function () {

    it('should return check that LoginLoading and LoginLoaded actions are dispatched', async function () {

      service.onLogging = jest.fn(() => Promise.resolve({}));

      const dispatch = jest.fn();

      await onLogging({ username: 'some username', password: 'some password' })(dispatch);

      console.log('dispatch:', dispatch.mock.calls);

      expect(dispatch.mock.calls[ 0 ][ 0 ]).toEqual(LoginLoading());
      expect(dispatch.mock.calls[ 1 ][ 0 ]).toEqual(LoginLoaded({}));

    });

  });

  describe('when Promise rejects - mock.calls counts incorrect THIS TEST FAILS', function () {

    it('should return check that LoginLoading and LoginError actions are dispatched', async function () {

      service.onLogging = jest.fn(() => Promise.reject('some error'));

      const dispatch = jest.fn();

      await onLogging({ username: 'some username', password: 'some password' })(dispatch);

      console.log('dispatch:', dispatch.mock.calls);

      expect(dispatch.mock.calls[ 0 ][ 0 ]).toEqual(LoginLoading());
      expect(dispatch.mock.calls[ 1 ][ 0 ]).toEqual(LoginError());

    });

  });

});