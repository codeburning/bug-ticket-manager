import * as uuid from 'uuid';
import { Types } from 'mongoose';
const colors = [
  '0e3b43',
  '357266',
  'a3bbad',
  '65532f',
  '312509',
  'eac435',
  '345995',
  '03cea4',
  'fb4d3d',
  'ca1551',
];

export const getUserAvatarColor = () => {
  const random = Math.random() * colors.length;
  const color = colors[parseInt(random.toString())];
  return `#${color}`;
};
export const getAccountId = () => {
  return uuid.v4();
};

export const createUniqueSetCreation = (
  a: Array<Types.ObjectId | string>,
  b: Array<Types.ObjectId | string>,
): Array<Types.ObjectId> => {
  const x = [...new Set([...b, ...a])];
  return x.map((a) => new Types.ObjectId(a));
};

export const generateTicketId = () => {
  return new Date().getTime();
};
