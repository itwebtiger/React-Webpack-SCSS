/**
 * Handles required setup before running AVA tests.
 */

import { JSDOM } from 'jsdom';
import MemoryStorage from 'memorystorage';
import mockRequire from 'mock-require';
import 'babel-register';
import enzymify from 'expect-enzyme';
import expectJSX from 'expect-jsx';
import expect, { spyOn, createSpy } from 'expect';
import { shallow, mount } from 'enzyme';
import dotenv from 'dotenv';

import testRuntimeConfiguration from './testRuntimeConfig.json';

expect.extend(expectJSX);
expect.extend(enzymify);

global.testHelper = {
  expect,
  spyOn,
  createSpy,
  shallow,
  mount,
};

/**
 * Setup application globals.
 */

global.window = new JSDOM('<body></body>').window;
global.document = window.document;
global.navigator = window.navigator;

global.localStorage = new MemoryStorage('LOCALSTORAGE-MOCK');
global.memoryDB = new MemoryStorage('MEMORYDB-MOCK');

// load all env variables
dotenv.config();

/**
 * The tests do not get access to the environment variables setup via Dotenv,
 * so define any globally-required environment variables here.
 */
process.env.API_BASE_URL = 'http://localhost:8080';

/**
 * AVA is unable to process these file types and will raise errors if they are not null.
 * These file types should have no bearing on our tests anyways.
 */

export function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;

/**
 * The runtime config is a "virtual module" provided by the Webpack VirtualModulePlugin.
 * As such, it is not available when running in test mode, outside of the Webpack context.
 * This mocks out the minimal contents of a runtime configuration needed for testing.
 */

mockRequire('runtimeConfig.json', testRuntimeConfiguration);
