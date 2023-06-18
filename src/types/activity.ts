import { Types } from 'mongoose';

export interface Activity {
  post: string;
  media: Array<string>;
}

export interface ActivityCreation extends Activity {
  ticket: Types.ObjectId;
  postedBy: Types.ObjectId;
  type: string;
}
