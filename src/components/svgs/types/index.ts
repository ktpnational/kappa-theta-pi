interface MutableSVGFuncTypes {
  cn: Parameters<typeof import('@/lib').cn>[0];
}

export interface TrueSVGProps extends Omit<SVGProps<SVGElement>, 'className'> {
  className?: MutableSVGFuncTypes['cn'];
}
