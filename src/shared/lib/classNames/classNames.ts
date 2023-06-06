type Mods = Record<string, boolean>

export const classNames = (className: string, mods: Mods = {}, additional: string[] = []) => {
  return [
    className,
    ...Object.entries(mods)
      .filter(([_, value]) => value)
      .map(([className]) => className),
    ...additional.filter(Boolean)
  ].join(' ')
}
