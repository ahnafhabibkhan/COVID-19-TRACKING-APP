// a function used to wait sertain time for testing

export function sleep(ms) {
    if(ms==undefined)
        ms=50;
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
