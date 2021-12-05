/*************************************************************
 *
 *  Copyright (c) 2018-2021 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  Implements the SVGmphantom wrapper for the MmlMphantom object
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {SVGWrapper} from '../Wrapper.js';
import {MmlMphantom} from '../../../core/MmlTree/MmlNodes/mphantom.js';

/*****************************************************************/
/**
 *  The SVGmi wrapper for the MmlMi object
 *
 * @template N  The HTMLElement node class
 * @template T  The Text node class
 * @template D  The Document class
 */
export class SVGmphantom<N, T, D> extends SVGWrapper<N, T, D> {

  /**
   * The mphantom wrapper
   */
  public static kind = MmlMphantom.prototype.kind;

  /**
   * @override
   */
  public toSVG(parent: N) {
    this.standardSVGnode(parent);
  }

}
