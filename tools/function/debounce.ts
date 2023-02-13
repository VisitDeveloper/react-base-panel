export function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }
  
  function test(message: string = "hi") {
    /// console.log("hi", message);
  }
  
  const debouncedTest = debounce(test, 2000);
  
  debouncedTest("message");
  