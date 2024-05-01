function onDragStart(event) {
  const targetID = event.target.id;
  event.dataTransfer.setData('text', targetID);  
  event.target.classList.add("is-dragging");
}

function onDragOver(event) {
  event.preventDefault();
 
  const dropzone = event.currentTarget;
  const dropzoneID = dropzone.id

  const bottomTask = insertAboveTask(dropzone, event.clientY);
  const curTask = document.querySelector(".is-dragging");

  const projectName = curTask.dataset.project
  console.log('onDragOver task project name', projectName)
  let ableToDrop = dropzoneID.includes(projectName)
  if(ableToDrop){
    if (!bottomTask) {
      dropzone.appendChild(curTask);
    } else {
      dropzone.insertBefore(curTask, bottomTask);
    }
  }
  else return
}

function onDragEnd(event) {
  event.target.classList.remove('is-dragging')
}

function onDragLeave(event){
  event.preventDefault()
}

function onDrop(event) {
  const id = event.dataTransfer.getData('text')
  const dropzone = event.currentTarget
  const curTask = document.querySelector(".is-dragging");
  const projectName = curTask.dataset.project
  const dropzoneID = dropzone.id

  let ableToDrop = dropzoneID.includes(projectName)
  let newStatus = dropzone.dataset.status
  if(ableToDrop){
    curTask.dataset.status = newStatus
    // Dispatch custom event with updated status
    const statusChangeEvent = new CustomEvent('statusChange', {
      detail: { id: id, newStatus: newStatus }
    });
    document.dispatchEvent(statusChangeEvent);
    event.dataTransfer.clearData();
  }

}

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".mini-card:not(.is-dragging)");
  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};

export {onDragStart, onDragOver, onDragEnd, onDragLeave, onDrop}