/*
 * Copyright (C) 2011 Intel Corp
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA
 * 02111-1307, USA.
 *
 * Author: Ross Burton <ross.burton@intel.com>
 */

const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Meta = imports.gi.Meta;

function AppWorkspaces() {
    this._init();
}

AppWorkspaces.prototype = {
    _init: function() {
        // A MetaScreen
        this.screen = global.screen;
        // A MetaDisplay
        this.display = this.screen.get_display();
        this.display.connect_after("window-created", Lang.bind(this, this._window_created));
    },

    _window_created: function(display, window) {
        if (window.get_window_type() == Meta.WindowType.NORMAL &&
            window.is_modal() == false) {
            let timestamp = global.get_current_time();
            let active_workspace = this.screen.get_active_workspace();
            
            // TODO: use the current workspace if it is empty (see
            // meego_netbook_move_window_to_its_workspace)
            workspace = this.screen.get_workspace_by_index (this.screen.n_workspaces - 1);
            
            window.change_workspace_by_index(workspace.index(), false, timestamp);
            workspace.activate_with_focus(window, timestamp);
        }
    }
}

function main() {
    // Initialize in an idle so that already-present windows don't get moved
    // around.
    Mainloop.idle_add(function() {
        new AppWorkspaces();
        return false;
    });
}
