
export interface User {
  username: string;
  email: string;
}

export interface CompressionResult {
  file_id: number;
  filename: string;
  original_size: number;
  compressed_size: number;
  compression_ratio: number;
  compression_time: number;
  upload_date: string;
}
