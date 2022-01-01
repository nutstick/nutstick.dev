// @ts-expect-error useId is future API
import { useId as useReactId, useRef } from 'react'

let counter = 0
// eslint-disable-next-line no-plusplus
export const useId = useReactId ?? (() => useRef(`${counter++}`).current)
