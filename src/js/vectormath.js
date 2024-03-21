/**
 *
 * @param {Vector2d} vec
 * @param {Vector2d} normal
 * @returns {Vector2d}
 */
export function reflectVector(vec, normal) {
    // 𝑟=𝑑−2(𝑑⋅𝑛)𝑛
    const norm = normal.normalize();
    const modifier = norm.scale(2 * vec.dot(norm));
    return vec.sub(modifier);
}
