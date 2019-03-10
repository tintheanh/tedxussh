import React from 'react'
import UpdateVision from './updateVision'

const UpdateVisions = props => {
  const { visions } = props
  return (
    <div className="col-12">
      {Object.keys(visions).map((k, i) => (
        <UpdateVision key={i} vision={visions[k]} id={k} />
      ))}
    </div>
  )
}

export default UpdateVisions
