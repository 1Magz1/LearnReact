type Mods = Record<string, boolean>

export const className = (className: string, mods: Mods, additional: string[]) => {
  return [
    className,
    ...Object.entries(mods)
      .filter(([_, value]) => value)
      .map(([className]) => className),
    ...additional
  ].join(' ')
}
