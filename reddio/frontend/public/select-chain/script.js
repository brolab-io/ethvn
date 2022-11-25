document.addEventListener("DOMContentLoaded", function () {
  const selectChain = document.querySelector("#select-chain");

  //   add event listener to the form submit button
  selectChain.addEventListener("submit", function (e) {
    e.preventDefault();
    //   get the value of the selected option
    const chain = selectChain.querySelector("select").value;
    //   redirect to the chain page
    window.location.href = `https://${chain}.brolab.io`;
  });
});
