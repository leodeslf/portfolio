const
  floor = Math.floor,
  p = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
    75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
    149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
    27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
    92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
    209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
    164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
    147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
    28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153,
    101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224,
    232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144,
    12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214,
    31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150,
    254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66,
    215, 61, 156, 180
  ],
  P = [...p, ...p];

function grad3D(hash, x, y, z) {
  const
    H = hash & 15,
    U = H < 8 ? x : y,
    v = H < 4 ? y : H === 12 || H === 14 ? x : z;

  return ((H & 1) === 0 ? U : -U) + ((H & 2) === 0 ? v : -v);
}

function lerp(t, a, b) {
  return a + t * (b - a);
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Returns a three-dimensional noise value, interval (-1, 1).
 * @param {number} x A numeric expression.
 * @param {number} y A numeric expression.
 * @param {number} z A numeric expression.
 * @returns {number} Perlin Noise value.
 */
function perlin3D(x, y, z) {
  const
    FX = floor(x),
    FY = floor(y),
    FZ = floor(z),
    X = FX & 255,
    Y = FY & 255,
    Z = FZ & 255,
    A = P[X] + Y,
    AA = P[A] + Z,
    AB = P[A + 1] + Z,
    B = P[X + 1] + Y,
    BA = P[B] + Z,
    BB = P[B + 1] + Z;

  x = x - FX;
  y = y - FY;

  const
    FDX = fade(x),
    FDY = fade(y);

  z = z - FZ;

  return lerp(
    fade(z),
    lerp(
      FDY,
      lerp(
        FDX,
        grad3D(P[AA], x, y, z),
        grad3D(P[BA], x - 1, y, z)
      ),
      lerp(
        FDX,
        grad3D(P[AB], x, y - 1, z),
        grad3D(P[BB], x - 1, y - 1, z)
      )
    ),
    lerp(
      FDY,
      lerp(
        FDX,
        grad3D(P[AA + 1], x, y, z - 1),
        grad3D(P[BA + 1], x - 1, y, z - 1)
      ),
      lerp(
        FDX,
        grad3D(P[AB + 1], x, y - 1, z - 1),
        grad3D(P[BB + 1], x - 1, y - 1, z - 1)
      )
    )
  );
}

export default perlin3D;
