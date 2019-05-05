#!/usr/bin/env python

# Copyright Huawei Technologies Co. Ltd. and other contributors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


import argparse
import hashlib
import struct
import sys


def parse_argument():
    """Parsing command line arguments.

    Returns:
        Normally, the ArgumentParser contains the values of the various parameters,
        in other cases, None.
    """
    parser = argparse.ArgumentParser(
        description='Upgrade package making tool.')
    parser.add_argument('-e', '--endian', dest='endian', choices={'big', 'little'},
                        action='store', default='little', help='Specify endian')
    parser.add_argument('-v', '--version', dest='version', metavar='version',
                        action='store', default=None, required=True, help='Specify the overall version number')
    parser.add_argument('-j', '--js', dest='js', metavar='filename',
                        action='store', default=None, help='Specify a js file')
    parser.add_argument('-jv', '--js-version', dest='jsversion', metavar='version',
                        action='store', default=None, help='Specify the js file version')
    parser.add_argument('-m', '--mcu', dest='mcu', metavar='filename',
                        action='store', default=None, help='Specify a mcu file')
    parser.add_argument('-mv', '--mcu-version', dest='mcuversion', metavar='version',
                        action='store', default=None, help='Specify the mcu file version')
    args = parser.parse_args()
    if args.js == None and args.mcu == None:
        parser.print_help()
        return None
    if args == None:
        parser.print_help()
    return args


def read_file(path: str):
    """Read files in binary read-only mode.

    Args:
        path: File path to read.

    Returns:
        Normally a string of type bytes, representing the data of the file,
        in other cases, None.
    """
    try:
        with open(path, 'rb') as f:
            return f.read()
    except FileNotFoundError as e:
        print(e)
        return None


def gen_header(version: str, endian: bool = True, js: dict = None, mcu: dict = None):
    """Generate binary information header.

    Combine the given data according to the specified format to generate a binary file header,
    the format of the file header is as follows:
    --------------------------------------------------
    Number of files (4 bytes)
    Overall version number length (4 bytes)
    Overall version number (64 bytes)
    --------------------------------------------------
    File type (4 bytes, 0 for js file and 1 for mcu file)
    Length of version number (4 bytes)
    Version number (string, 64 bytes)
    Hash algorithm name (12 bytes, only 'sha256' now)
    Hash value (hexadecimal number, 32 bytes)
    File data length (4 bytes)
    ------------The following is optional-------------
    File type (4 bytes, 0 for js file and 1 for mcu file)
    Length of version number (4 bytes)
    Version number (string, 64 bytes)
    Hash algorithm name (12 bytes, only 'sha256' now)
    Hash value (hexadecimal number, 32 bytes)
    File data length (4 bytes)
    --------------------------------------------------

    Args:
        version: A string representing the overall version number.
        endian: A Boolean value indicating the endianness, true means big endian.
        js: A dictionary containing information about js files.
        mcu: A dictionary containing information about mcu files.

    Returns:
        Normally a string of type bytes, representing the header of the file,
        in other cases, None.
    """
    file_num = 0
    fmt = ''
    header = b''
    headers = list()
    if endian:
        fmt = '>2I64s12s32sI'
    else:
        fmt = '<2I64s12s32sI'
    if js == None and mcu == None:
        print('ParameterError: Please enter complete information for at least one file')
        return None
    if js != None:
        file_num += 1
        file_type = 0
        len_file = len(js['data'])
        len_version = len(js['version'])
        b_version = bytes(js['version'], encoding='utf-8')
        b_hash_name = bytes('sha256', encoding='utf-8')
        sha = hashlib.sha256()
        sha.update(js['data'])
        b_hash_value = sha.digest()
        headers.append(struct.pack(fmt, file_type, len_version,
                                   b_version, b_hash_name, b_hash_value, len_file))
    if mcu != None:
        file_num += 1
        file_type = 1
        len_file = len(mcu['data'])
        len_version = len(mcu['version'])
        b_version = bytes(mcu['version'], encoding='utf-8')
        b_hash_name = bytes('sha256', encoding='utf-8')
        sha = hashlib.sha256()
        sha.update(mcu['data'])
        b_hash_value = sha.digest()
        headers.append(struct.pack(fmt, file_type, len_version,
                                   b_version, b_hash_name, b_hash_value, len_file))
    len_version = len(version)
    b_version = bytes(version, encoding='utf-8')
    header = struct.pack(fmt[0:6], file_num, len_version, b_version)
    for item in headers:
        header += item
    if len(header) < 512:
        pad = 512-32-len(header)
        header += struct.pack(str(pad)+'x')
    return header


def gen_bin(path: str, header: bytes, js: dict = None, mcu: dict = None):
    """Generate a binary file.

    Write the given data to the specified binary file.

    Args:
        path: The path to the binary to be written.
        header: Binary file header.
        js: A dictionary containing the js files to be written.
        mcu: A dictionary containing the binary files to be written.
    """
    sha = hashlib.sha256()
    sha.update(header)
    if js != None and js['data'] != None:
        sha.update(js['data'])
    if mcu != None and mcu['data'] != None:
        sha.update(mcu['data'])
    with open(path, 'wb') as f:
        f.write(struct.pack('32s', sha.digest()))
        f.write(header)
        if js != None and js['data'] != None:
            f.write(js['data'])
        if mcu != None and mcu['data'] != None:
            f.write(mcu['data'])


def main():
    args = parse_argument()
    if args == None:
        sys.exit(1)
    out = 'mcu_ota_all.bin'
    version = args.version
    if args.js != None and args.jsversion != None:
        js = dict()
        js['version'] = args.jsversion
        js['data'] = read_file(args.js)
        if js['data'] == None:
            sys.exit(1)
    else:
        js = None
    if args.mcu != None and args.mcuversion != None:
        mcu = dict()
        mcu['version'] = args.mcuversion
        mcu['data'] = read_file(args.mcu)
        if mcu['data'] == None:
            sys.exit(1)
    else:
        mcu = None
    endian = True if args.endian == 'big' else False
    header = gen_header(version, endian=endian, js=js, mcu=mcu)
    if header != None:
        gen_bin(out, header, js=js, mcu=mcu)


if __name__ == '__main__':
    main()
