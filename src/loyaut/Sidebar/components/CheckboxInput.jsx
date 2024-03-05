import { useState, Fragment, useContext, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { Context } from '../../../context/Context';
function CheckboxInput() {

  const [enabled, setEnabled] = useState(false)
  const { setDarkmode } = useContext(Context)
  useEffect(() => {
    setDarkmode(enabled)
  }, [enabled])

  return (
    <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
      {({ checked }) => (
        <button
          className={`${checked ? 'bg-blue-500' : 'bg-blue-500'
            } relative inline-flex h-6 w-14 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${checked ? 'translate-x-6' : 'translate-x-0'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </button>
      )}
    </Switch>
  )
}


export default CheckboxInput
