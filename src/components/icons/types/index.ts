type NumberRange<T extends number, R extends number[] = []> = R['length'] extends T
  ? R[number]
  : NumberRange<T, [...R, R['length']]>;

type sizes = `${
  | NumberRange<13>
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96}`;

export interface IconProps extends React.HTMLAttributes<SVGElement> {
  size?: sizes;
}
