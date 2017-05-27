Jest Bug with Promise Reject

when mocking Promise.reject mock.calls is incorrect

## Example: When mocking Promise.resolve mock.calls is correct

    `
    service.onLogging = jest.fn(() => Promise.resolve({}));

    const dispatch = jest.fn();

    await onLogging({ username: 'some username', password: 'some password' })(dispatch);

    console.log('dispatch:', dispatch.mock.calls);

    expect(dispatch.mock.calls[ 0 ][ 0 ]).toEqual(LoginLoading());
    expect(dispatch.mock.calls[ 1 ][ 0 ]).toEqual(LoginLoaded({}));

    expect(dispatch.mock.calls[ 0 ][ 0 ]).toEqual(LoginLoading());
    expect(dispatch.mock.calls[ 1 ][ 0 ]).toEqual(LoginLoaded({}));

    `
Both mock.calls are present


## Example: When mocking Promise.reject mock.calls is incorrect


    ### Implementation

    `
    export function onLogging (payload) {
      return function (dispatch) {
        dispatch(LoginLoading());
        service.onLogging(payload).then((results) => {
          dispatch(LoginLoaded(results));
        }).catch((error) => {
          dispatch(LoginError());
          console.log('Promise RECT!!!!!', error); // this console.log is displayed meaning it is being mocked correctly.
        });
      }
    }
    `

    ## Output - both mock.calls are present

    `
      console.log src/login.test.js:22
        dispatch: [ [ { type: 'LOGIN_LOADING' } ],
          [ { type: 'LOGIN_LOADED', payload: {} } ] ]
    `


    ### Test

    `
    service.onLogging = jest.fn(() => Promise.reject('some error'));

    const dispatch = jest.fn();

    await onLogging({ username: 'some username', password: 'some password' })(dispatch);

    console.log('dispatch:', dispatch.mock.calls);

    expect(dispatch.mock.calls[ 0 ][ 0 ]).toEqual(LoginLoading());
    expect(dispatch.mock.calls[ 1 ][ 0 ]).toEqual(LoginError());

    `

    ### Output - only one mock.calls is present

    `
     console.log src/login.test.js:41
        dispatch: [ [ { type: 'LOGIN_LOADING' } ] ]

      console.log src/login.js:46
        Promise RECT!!!!! some error

    `
Here only one mock.call is present the other one missing, however the console.log show that it executed the catch method.
