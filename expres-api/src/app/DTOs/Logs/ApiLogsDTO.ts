
export class ApiLogsDTO {
    fecha: Date;
    endpoint: string;
    http_method: string;
    client_ip: string;
    user_agent?: string;
    response_code: number;
    response_time_ms: number;
    request_params?: string;
  }
  