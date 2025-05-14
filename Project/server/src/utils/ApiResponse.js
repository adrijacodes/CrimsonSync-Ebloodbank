class ApiResponse {
    constructor(data, message,success) {
      (this.data = data), (this.success = success), (this.message = message);
    }
  }
  export { ApiResponse };
  