/**
 * setup shader and link it to the program
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} vertexSource
 * @param {string} fragmentSource
 *
 * @returns {WebGLProgram} shaderProgram
 */
function setupShaders(gl, vertexSource, fragmentSource) {
  var vertextShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertextShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("failed to setup shaders");
  }

  return shaderProgram;
}

/**
 * load and compile new shader, depending on the type it can be either [gl.VERTEX_SHADER]
 * or [gl.FRAGMENT_SHADER]
 *
 * if there is any error when compiling the shader, the erroneous shader will be deleted and
 * an error log is sent
 *
 * @param {WebGLRenderingContext} gl
 * @param {number} type
 * @param {string} shaderSource
 *
 * @returns {WebGLShader}
 */
function loadShader(gl, type, shaderSource) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  // if something happened, delete the shader and return null
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`ERROR ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
