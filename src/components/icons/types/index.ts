type sizes =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '36'
  | '40'
  | '44'
  | '48'
  | '52'
  | '56'
  | '60'
  | '64'
  | '72'
  | '80'
  | '96';

type SVGIconProps = {
  className?: string;
  props?: React.SVGProps<SVGSVGElement>;
  size?: sizes | '4';
};

type SVGIconParams = ({ className, size, props }: SVGIconProps) => JSX.Element;

type IconsProps = DeepRequired<{
  [key: string]: {
    [key: string]: SVGIconParams;
  };
}>;

export type { IconsProps, SVGIconProps, SVGIconParams, sizes };
